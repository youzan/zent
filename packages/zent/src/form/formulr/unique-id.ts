class UniqueId {
  private id = 0;

  constructor(private readonly prefix: string) {}

  get() {
    this.id += 1;
    return `${this.prefix}-${this.id}`;
  }
}

export default UniqueId;
