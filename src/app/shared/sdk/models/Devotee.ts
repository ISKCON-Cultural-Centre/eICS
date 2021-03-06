/* tslint:disable */
import {
  SpiritualLevelMaster,
  ElectronicAddress,
  PhysicalAddress
} from '../index';

declare var Object: any;
export interface DevoteeInterface {
  "id": string;
  "legalName": string;
  "circleId"?: string;
  "spiritualName"?: string;
  "gender": boolean;
  "physicalAddressId"?: string;
  "electronicAddressId"?: string;
  "shikshaLevel"?: string;
  "spiritualLevelMasterId": string;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "created-on"?: Date;
  "updated-on"?: Date;
  "password"?: string;
  accessTokens?: any[];
  fkDevoteeSpiritualLevelMaster1rel?: SpiritualLevelMaster;
  fkDevoteeElectronicAddress1rel?: ElectronicAddress;
  fkDevoteePhysicalAddress1rel?: PhysicalAddress;
}

export class Devotee implements DevoteeInterface {
  "id": string;
  "legalName": string;
  "circleId": string;
  "spiritualName": string;
  "gender": boolean;
  "physicalAddressId": string;
  "electronicAddressId": string;
  "shikshaLevel": string;
  "spiritualLevelMasterId": string;
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "created-on": Date;
  "updated-on": Date;
  "password": string;
  accessTokens: any[];
  fkDevoteeSpiritualLevelMaster1rel: SpiritualLevelMaster;
  fkDevoteeElectronicAddress1rel: ElectronicAddress;
  fkDevoteePhysicalAddress1rel: PhysicalAddress;
  constructor(data?: DevoteeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Devotee`.
   */
  public static getModelName() {
    return "Devotee";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Devotee for dynamic purposes.
  **/
  public static factory(data: DevoteeInterface): Devotee{
    return new Devotee(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Devotee',
      plural: 'Devotees',
      path: 'Devotees',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'string'
        },
        "legalName": {
          name: 'legalName',
          type: 'string'
        },
        "circleId": {
          name: 'circleId',
          type: 'string'
        },
        "spiritualName": {
          name: 'spiritualName',
          type: 'string'
        },
        "gender": {
          name: 'gender',
          type: 'boolean'
        },
        "physicalAddressId": {
          name: 'physicalAddressId',
          type: 'string'
        },
        "electronicAddressId": {
          name: 'electronicAddressId',
          type: 'string'
        },
        "shikshaLevel": {
          name: 'shikshaLevel',
          type: 'string'
        },
        "spiritualLevelMasterId": {
          name: 'spiritualLevelMasterId',
          type: 'string'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "created-on": {
          name: 'created-on',
          type: 'Date'
        },
        "updated-on": {
          name: 'updated-on',
          type: 'Date'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        fkDevoteeSpiritualLevelMaster1rel: {
          name: 'fkDevoteeSpiritualLevelMaster1rel',
          type: 'SpiritualLevelMaster',
          model: 'SpiritualLevelMaster',
          relationType: 'belongsTo',
                  keyFrom: 'spiritualLevelMasterId',
          keyTo: 'id'
        },
        fkDevoteeElectronicAddress1rel: {
          name: 'fkDevoteeElectronicAddress1rel',
          type: 'ElectronicAddress',
          model: 'ElectronicAddress',
          relationType: 'belongsTo',
                  keyFrom: 'electronicAddressId',
          keyTo: 'id'
        },
        fkDevoteePhysicalAddress1rel: {
          name: 'fkDevoteePhysicalAddress1rel',
          type: 'PhysicalAddress',
          model: 'PhysicalAddress',
          relationType: 'belongsTo',
                  keyFrom: 'physicalAddressId',
          keyTo: 'id'
        },
      }
    }
  }
}
