import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { GlobalConstants } from 'src/app/core/constants/globalConstants';
import { RouteState } from 'src/app/core/models/RouteState';

/**
 * Route state service
 * Save all route data, helps to navigate routes
 */
@Injectable({
  providedIn: 'root'
})
export class RouteStateService {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private location: Location) {

  }

  /**
   * get current route data
   */
  getCurrent(): RouteState {
    const path = this.router.url;
    const routeStates = this.getRouteStates(path);
    return routeStates[routeStates.length - 1];
  }

  /**
   * add route data
   * @param title route name
   * @param path route path
   * @param data route data
   * @param isCleanAll is parent route
   */
  navigateTo(path: string, data?: any, isNewTab?: boolean, isCleanAll?: boolean): void {
    if (isCleanAll) {
      this.clear();
    }

    const routeStates = this.getAllRouteStates();
    const time = new Date().getTime();
    const routeState = { path, data, time };
    routeStates.push(routeState);
    this.saveRouteStates(routeStates);

    isNewTab ? window.open(path, '_blank') : this.router.navigate([path]);
  }

  /**
   * load previous route
   */
  loadPrevious(): void {
    const routeStates = this.getAllRouteStates();
    routeStates.pop();
    this.saveRouteStates(routeStates);
    // const routeState = routeStates[routeStates.length - 1];
    // this.router.navigate([routeState.path]);
    this.location.back();
  }

  clear(): void {
    this.localStorageService.removeItem(GlobalConstants.routeStateKey);
  }

  remove(path: string): void {
    const allRouteStates = this.getAllRouteStates();
    const routeStates = allRouteStates.filter(x => x.path !== path);
    this.saveRouteStates(routeStates);
  }

  private saveRouteStates(routeStates: RouteState[]): void {
    this.localStorageService.setItem(GlobalConstants.routeStateKey, routeStates);
  }

  private getAllRouteStates(): RouteState[] {
    const routeStates: RouteState[] = this.localStorageService.getItem(GlobalConstants.routeStateKey) ?? [];
    return routeStates;
  }

  private getRouteStates(path: string): RouteState[] {
    const allRouteStates = this.getAllRouteStates();
    return allRouteStates.filter(x => x.path === path);
  }
}
