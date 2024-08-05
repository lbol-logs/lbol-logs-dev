import { TObjAny } from 'utils/types/common';
import { TPromise } from 'utils/types/others';

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
      (result: TObjAny) => {
        promise.status = 'fulfilled';
        promise.value = result;
      },
      (reason: TObjAny) => {
        promise.status = 'rejected';
        promise.reason = reason;
      },      
    );
    throw promise;
  }
}

export default use;