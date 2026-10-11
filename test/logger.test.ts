import { afterEach, describe, expect, it, vi } from "vitest";
import { logger } from "../src/logger.js";

describe("logger output streams", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("writes info and warning messages to stdout and errors to stderr", () => {
    const stdoutWrite = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    const stderrWrite = vi.spyOn(process.stderr, "write").mockImplementation(() => true);

    logger.info("captured", { id: "memory-1" });
    logger.warn("retrying");
    logger.error("failed");

    expect(stdoutWrite.mock.calls.map(([line]) => line)).toEqual([
      '[agentmemory] info captured {"id":"memory-1"}\n',
      "[agentmemory] warn retrying\n",
    ]);
    expect(stderrWrite.mock.calls.map(([line]) => line)).toEqual([
      "[agentmemory] error failed\n",
    ]);
  });
});
