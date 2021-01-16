export interface IOwner {
  id?: number;
  owner?: string;
}

export class Owner implements IOwner {
  constructor(public id?: number, public owner?: string) {}
}
