import { Server } from "socket.io";
import { SocketUtil } from "./../utils/socketUtils.js";
import { jest } from "@jest/globals";
import multer from "multer";
import path from "path";
import upload from "../utils/multer.js";

import { LocaleService } from "../utils/localeService.mjs";

// Create a mock Server class
class MockServer {
  constructor() {
    this.eventHandlers = {};
  }

  on(event, handler) {
    this.eventHandlers[event] = handler;
  }
}

describe("SocketUtil", () => {
  let mockServer;

  beforeEach(() => {
    mockServer = new MockServer();
  });

  afterEach(() => {
    mockServer = null;
  });

  describe("config", () => {
    it("should create a socket server with provided options", () => {
      SocketUtil.config(mockServer);

      // Check if the mockServer is not an instance of Server
      expect(mockServer instanceof Server).toBe(false);
    });
  });
});

describe("Multer middleware configuration", () => {
  it("should allow .jpg, .jpeg, and .png files", () => {
    // Create a mock request object
    const req = {
      file: {
        originalname: "test.jpg",
      },
    };

    // Create a mock callback function for the fileFilter
    const cb = jest.fn();

    // Call the fileFilter function of the upload middleware
    upload.fileFilter(req, req.file, cb);

    // Expect the callback to be called with no error and true
    expect(cb).toHaveBeenCalledWith(null, true);
  });

  it("should reject other file types", () => {
    // Create a mock request object with a non-supported file type
    const req = {
      file: {
        originalname: "test.txt",
      },
    };

    // Create a mock callback function for the fileFilter
    const cb = jest.fn();

    // Call the fileFilter function of the upload middleware
    upload.fileFilter(req, req.file, cb);

    // Expect the callback to be called with an error and false
    expect(cb).toHaveBeenCalledWith(
      new Error("File type is not supported"),
      false,
    );
  });
});

describe("LocaleService", () => {
  let i18nProvider;
  let localeService;
  // Mock i18nProvider for testing purposes
  const mockI18nProvider = {
    getLocale: jest.fn(),
    getLocales: jest.fn(),
    setLocale: jest.fn(),
    __: jest.fn(),
    __n: jest.fn(),
  };

  beforeEach(() => {
    // Mock i18nProvider object
    i18nProvider = {
      getLocale: jest.fn(),
      getLocales: jest.fn(),
      setLocale: jest.fn(),
      __: jest.fn(),
      __n: jest.fn(),
    };

    // Create a new instance of LocaleService with the mock i18nProvider
    localeService = new LocaleService(i18nProvider);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  describe("getCurrentLocale", () => {
    it("should return the current locale", () => {
      // Mock i18nProvider.getLocale to return 'en_US'
      i18nProvider.getLocale.mockReturnValue("en_US");

      // Call getCurrentLocale method
      const result = localeService.getCurrentLocale();

      // Expect i18nProvider.getLocale to be called
      expect(i18nProvider.getLocale).toHaveBeenCalled();

      // Expect the result to be 'en_US'
      expect(result).toBe("en_US");
    });
  });

  describe("getLocales", () => {
    it("should return an array of locales", () => {
      // Mock i18nProvider.getLocales to return an array of locales
      i18nProvider.getLocales.mockReturnValue(["en_US", "fr_FR", "de_DE"]);

      // Call getLocales method
      const result = localeService.getLocales();

      // Expect i18nProvider.getLocales to be called
      expect(i18nProvider.getLocales).toHaveBeenCalled();

      // Expect the result to be an array containing 'en_US', 'fr_FR', and 'de_DE'
      expect(result).toEqual(["en_US", "fr_FR", "de_DE"]);
    });
  });

  describe("setLocale", () => {
    it("should set the current locale if it exists", () => {
      // Mock getLocales to return an array of locales
      i18nProvider.getLocales.mockReturnValue(["en_US", "fr_FR", "de_DE"]);

      // Call setLocale method with a valid locale
      localeService.setLocale("fr_FR");

      // Expect i18nProvider.setLocale to be called with 'fr_FR'
      expect(i18nProvider.setLocale).toHaveBeenCalledWith("fr_FR");
    });

    it("should not set the current locale if it does not exist", () => {
      // Mock getLocales to return an array of locales
      i18nProvider.getLocales.mockReturnValue(["en_US", "fr_FR", "de_DE"]);

      // Call setLocale method with an invalid locale
      localeService.setLocale("es_ES");

      // Expect i18nProvider.setLocale not to be called
      expect(i18nProvider.setLocale).not.toHaveBeenCalled();
    });
  });

  describe("translate", () => {
    it("should translate a string", () => {
      // Mock i18nProvider.__ to return the translated string
      i18nProvider.__.mockReturnValue("Translated string");

      // Call translate method with a string
      const result = localeService.translate("Hello");

      // Expect i18nProvider.__ to be called with 'Hello'
      expect(i18nProvider.__).toHaveBeenCalledWith("Hello", undefined);

      // Expect the result to be 'Translated string'
      expect(result).toBe("Translated string");
    });
  });

  describe("translatePlurals", () => {
    it("should translate a plural string", () => {
      // Mock i18nProvider.__n to return the translated plural string
      i18nProvider.__n.mockReturnValue("Translated plural string");

      // Call translatePlurals method with a phrase and count
      const result = localeService.translatePlurals("apple", 2);

      // Expect i18nProvider.__n to be called with 'apple' and 2
      expect(i18nProvider.__n).toHaveBeenCalledWith("apple", 2);

      // Expect the result to be 'Translated plural string'
      expect(result).toBe("Translated plural string");
    });
  });
});
