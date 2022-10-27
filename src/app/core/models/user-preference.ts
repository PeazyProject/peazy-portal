export class UserPreference {
  dataTablePreferences: DataTablePreference[];
  searchFormParameterGroups: SearchFormParameterGroup[];

  constructor() {
    this.dataTablePreferences = [];
    this.searchFormParameterGroups = [];
  }
}

export interface DataTablePreference {
  tableName: string;
  state: any;
}

export interface DataDetailTablePreference {
  tableName: string;
  state: any;
}

export interface SearchFormParameterGroup {
  formName: string;
  parameterGroups: { groupName: string, parameters: any }[];
}
