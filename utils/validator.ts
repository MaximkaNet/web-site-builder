export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  // At least 8 characters, one uppercase, one lowercase, one number, one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
  return passwordRegex.test(password);
}

export abstract class Condition {
  public message: string;

  constructor(message: string) {
    this.message = message;
  }

  abstract test(str: string): boolean;
}

export class LengthCondition extends Condition {
  constructor() {
    super("At least 8 characters")
  }

  override test(str: string): boolean {
    return str.length >= 8;
  }
}

export class UppercaseCondition extends Condition {
  constructor() {
    super("At least one uppercase")
  }

  override test(str: string): boolean {
    return RegExp(/[A-Z]/).test(str)
  }
}

export class LowercaseCondition extends Condition {
  constructor() {
    super("At least one lowercase")
  }

  override test(str: string): boolean {
    return RegExp(/[a-z]/).test(str)
  }
}

export class NumberCondition extends Condition {
  constructor() {
    super("At least one number")
  }

  override test(str: string): boolean {
    return RegExp(/\d/).test(str)
  }
}

export class SpecialCharCondition extends Condition {
  constructor() {
    super("At least one special character")
  }

  override test(str: string): boolean {
    return RegExp(/[@$!%*?#&]/).test(str)
  }
}