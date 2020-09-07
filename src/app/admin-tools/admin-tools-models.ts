interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  first: boolean;
  numberOfElements: number;
  number: number;
  sort: Sort;
  empty: boolean;
}

class ContactInformation {
  constructor(
    public email?: string,
    public phone_number?: string,
    public address?: string
  ) {
  }
}

export class Client {
  constructor(
    public name?: string,
    public nameAr?: string,
    public id?: string,
    public activity: Activity = new Activity(),
    public contactInfo: ContactInformation = new ContactInformation(),
    public createdBy?: string,
    public createdDate?: string,
    public enabled?: boolean,
    public properties?: any
    // subscriptions: []
  ) {
  }
}

export class Role {
  constructor(
    public name?: string,
    public id?: string
  ) {
  }
}

export class Activity {
  constructor(
    public id?: string,
    public name?: string,
    public nameAr?: string
  ) {
  }
}
