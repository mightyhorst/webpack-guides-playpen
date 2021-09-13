// import { cock } from 'cock';
import {fire} from './worker-client';

export default function printMe() {
  fire();
  alert('I get called from print.js! ');
}
