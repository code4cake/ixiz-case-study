import { describe, it, expect, vi, beforeEach } from "vitest";
import { toast } from "react-hot-toast";

import { showToast } from "./showToast.utils";

vi.mock("react-hot-toast", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
    custom: vi.fn(),
  },
}));

describe("showToast", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call toast.success with correct parameters", () => {
    const props = {
      type: "success" as const,
      message: "Success message",
      options: { duration: 3000 },
    };

    showToast(props);

    expect(toast.success).toHaveBeenCalledWith("Success message", {
      duration: 3000,
    });
  });

  it("should call toast.error with correct parameters", () => {
    const props = {
      type: "error" as const,
      message: "Error message",
      options: { position: "top-right" as const },
    };

    showToast(props);

    expect(toast.error).toHaveBeenCalledWith("Error message", {
      position: "top-right",
    });
  });

  it("should call toast.loading with correct parameters", () => {
    const props = {
      type: "loading" as const,
      message: "Loading...",
    };

    showToast(props);

    expect(toast.loading).toHaveBeenCalledWith("Loading...", {});
  });

  it("should call toast.custom with correct parameters", () => {
    const props = {
      type: "custom" as const,
      message: "Custom message",
      options: { id: "custom-toast" },
    };

    showToast(props);

    expect(toast.custom).toHaveBeenCalledWith("Custom message", {
      id: "custom-toast",
    });
  });

  it("should work without options", () => {
    const props = {
      type: "success" as const,
      message: "Success without options",
    };

    showToast(props);

    expect(toast.success).toHaveBeenCalledWith("Success without options", {});
  });

  it("should merge default options with provided options", () => {
    const defaultOptions = { duration: 2000 };
    const customOptions = { position: "bottom-right" as const };

    const props = {
      type: "error" as const,
      message: "Error message",
      options: { ...defaultOptions, ...customOptions },
    };

    showToast(props);

    expect(toast.error).toHaveBeenCalledWith("Error message", {
      duration: 2000,
      position: "bottom-right",
    });
  });
});
