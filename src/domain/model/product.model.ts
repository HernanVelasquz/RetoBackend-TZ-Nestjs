import { v4 as uuid } from 'uuid';

export class ProductDomain {
  id: string;
  name: string;
  inventory: number;
  enabled: boolean;
  min: number;
  max: number;

  constructor({
    name,
    inventory,
    enabled,
    min,
    max,
  }: {
    name: string;
    inventory: number;
    enabled: boolean;
    min: number;
    max: number;
  }) {
    this.id = uuid();
    this.name = name;
    this.inventory = inventory;
    this.enabled = enabled;
    this.min = min;
    this.max = max;
  }
}
