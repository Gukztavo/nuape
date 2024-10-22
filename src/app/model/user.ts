export class User {
  name: string | null;
  email: string | null;
  role: string | null;

  constructor({
    name = null,
    email = null,
    role = null,
  }: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  } = {}) {
    this.name = name;
    this.email = email;
    this.role = role;
  }

  get is_admin() {
    return this.role === 'Admin';
  }

  get http_data() {
    return {
      name: this.name,
      email: this.email,
      role: this.role,
    };
  }
}
