import * as configcat from "configcat-js";

import { Observable, from } from "rxjs";

import { Component } from '@angular/core';
import { IConfigCatClient } from 'configcat-common';
import { environment } from './../environments/environment';

const PROD_KEY = 'OqjZCL4tFkGE81nOqZJAOA/wOtIC1UAt0Kr6vRZpSfeBA';
const TEST_KEY = 'OqjZCL4tFkGE81nOqZJAOA/B8v7Zcm71k2f3UlX6OLpZQ';

interface SettingToggle {
  settingKey: string;
  settingValue: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public configCatClient!: IConfigCatClient;
  public allToggles$!: Observable<SettingToggle[]>;

  // ENVIRONMENTS
  public prodKey = PROD_KEY;
  public testKey = TEST_KEY;
  public sdkKey = PROD_KEY;
  
  public identifier = '';


  constructor() {
    this.initConfigAndToggles();
  }

  public identifierChanged(identifier: string) {
    this.allToggles$ = from(this.configCatClient.getAllValuesAsync({ identifier }));
  }

  public environmentChanged(environment: string) {
    this.initConfigAndToggles();
  }

  public typeOfToggle(toggle: boolean | number) {
    return typeof toggle;
  }


  private initConfigAndToggles() {
    this.configCatClient = configcat.createClientWithAutoPoll(this.sdkKey, { pollIntervalSeconds: 2 });
    this.allToggles$ = from(this.configCatClient.getAllValuesAsync({ identifier: this.identifier }));
  }

}