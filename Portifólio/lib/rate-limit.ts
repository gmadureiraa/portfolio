import { Redis } from "@upstash/redis";

const KV_URL =
  process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const KV_TOKEN =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";

const redis =
  KV_URL && KV_TOKEN ? new Redis({ url: KV_URL, token: KV_TOKEN }) : null;

// Memory fallback for local/preview when Upstash is not configured.
const memory = new Map<string, { count: number; resetAt: number }>();

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Sliding fixed-window rate limiter.
 * - `bucket`: logical name of the endpoint (e.g. `telegram-contact`).
 * - `id`: client identifier (IP, email, etc).
 * - `limit`: max requests per window.
 * - `windowSec`: window length in seconds.
 */
export async function rateLimit(
  bucket: string,
  id: string,
  limit: number,
  windowSec: number,
): Promise<RateLimitResult> {
  const key = `rl:${bucket}:${id}`;
  const now = Date.now();
  const resetAtMs = now + windowSec * 1000;

  if (redis) {
    try {
      const count = await redis.incr(key);
      if (count === 1) {
        await redis.expire(key, windowSec);
      }
      const ttl = await redis.ttl(key);
      const resetAt = now + (ttl > 0 ? ttl * 1000 : windowSec * 1000);
      return {
        ok: count <= limit,
        remaining: Math.max(0, limit - count),
        resetAt,
      };
    } catch {
      // fall through to memory store
    }
  }

  const entry = memory.get(key);
  if (!entry || entry.resetAt <= now) {
    memory.set(key, { count: 1, resetAt: resetAtMs });
    return { ok: true, remaining: limit - 1, resetAt: resetAtMs };
  }
  entry.count += 1;
  return {
    ok: entry.count <= limit,
    remaining: Math.max(0, limit - entry.count),
    resetAt: entry.resetAt,
  };
}

export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "anonymous";
}
