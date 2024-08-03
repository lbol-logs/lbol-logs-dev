import { TObj, TPromise } from 'utils/types';

function use(promise: TPromise) {
  if (promise.status === 'fulfilled') {
    return promise.value;
  } else if (promise.status === 'rejected') {
    throw promise.reason;
  } else if (promise.status === 'pending') {
    throw promise;
  } else {
    promise.status = 'pending';
    promise.then(
      (result: TObj) => {
        promise.status = 'fulfilled';
        promise.value = result;
      },
      (reason: TObj) => {
        promise.status = 'rejected';
        promise.reason = reason;
      },      
    );
    throw promise;
  }
}

export default use;