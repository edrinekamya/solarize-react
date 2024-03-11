import AuthStore from "./auth";
import MainStore from "./main";
import PaymentStore from "./payment";
import SlideStore from "./slide";

export default class RootStore {
  authStore: AuthStore;
  mainStore: MainStore;
  paymentSore: PaymentStore;
  slideStore: SlideStore;
  
  constructor() {
    this.authStore = new AuthStore(this)
    this.mainStore = new MainStore(this)
    this.paymentSore = new PaymentStore(this)
    this.slideStore = new SlideStore(this)
  }
}