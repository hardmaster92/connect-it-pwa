import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy,
} from '@angular/core';

interface NetworkInformationExtended {
  type?: string;
  downlink?: number;
  downlinkMax?: number;
  rtt?: number;
  effectiveType?: string;
  saveData?: boolean;
}

@Component({
  selector: 'app-network-info',
  templateUrl: './network-info.page.html',
  styleUrls: ['./network-info.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkInfoPage implements OnDestroy {
  public networkInfo: NetworkInformationExtended | null = this.getNetworkInfo();
  private boundConnectionChange = this.onConnectionChange.bind(this) as () => void;

  constructor(private cdr: ChangeDetectorRef) {
    window.navigator.connection.addEventListener('change', this.boundConnectionChange);
  }

  ngOnDestroy(): void {
    window.navigator.connection.removeEventListener('change', this.boundConnectionChange);
  }

  private getNetworkInfo(): NetworkInformationExtended | null {
    if (!('connection' in navigator)) {
      return null;
    }

    const {
      type, downlink, downlinkMax, effectiveType, rtt, saveData,
    } = navigator.connection as NetworkInformationExtended;

    return {
      type,
      downlink,
      downlinkMax,
      effectiveType,
      rtt,
      saveData,
    };
  }

  private onConnectionChange(): void {
    this.networkInfo = this.getNetworkInfo();
    this.cdr.markForCheck();
  }
}
