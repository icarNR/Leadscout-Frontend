import { makeAutoObservable } from 'mobx';

class UserStore {
  user_id = '000';
  name = '';
  email = '';
  position = '';
  attempts = 0;
  supervisor = '';
  requested = null;
  observed = false;
  allowed_assess = false;
  self_answers = [];
  supervisor_answers = [];
  potential = 0.0;
  department = '';
  admin = false;

  constructor() {
    makeAutoObservable(this);
  }

  updateUser(data) {
    Object.assign(this, data);
  }

  updateVariable(key, value) {
    this[key] = value;
  }
}

const userStore = new UserStore();

export default userStore;
