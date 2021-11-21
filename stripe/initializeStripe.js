import { Stripe, loadStripe } from "@stripe/stripe-js";

//let stripePromise = Stripe | null;
let stripePromise;
const initializeStripe = async () => {
  /*if (!stripePromise) {
    stripePromise = await loadStripe("pk_test_51Jx1cdLBlaDAR7THzsOatgkQk8OYrYzoeZzljbQTVZvd8rcGrlrWxqmDxuLtA2waXPYnOHBIlxjWI4PMjjF8Otxa00naRp98mK");
  }*/
  stripePromise = await loadStripe("pk_test_51Jx1cdLBlaDAR7THzsOatgkQk8OYrYzoeZzljbQTVZvd8rcGrlrWxqmDxuLtA2waXPYnOHBIlxjWI4PMjjF8Otxa00naRp98mK");
  alert(stripePromise);
  return stripePromise;
};

export default initializeStripe;