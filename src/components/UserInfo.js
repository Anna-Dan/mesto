export class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

//   getUserInfo() {
//     return {
//       name: this._profileName.textContent,
//       job: this._profileDescription.textContent,
//     };
//   }

//   setUserInfo({name, about}) {
//     this._profileName.textContent = name;
//     this._profileDescription.textContent = about;

//   }
//   setAvatar({avatarURL}) {
//     this.profileAvatar.src = avatarURL.avatar;
//   }

// }

getUserInfo() {
  return {name: this._profileName.textContent, job: this._profileDescription.textContent};
}

// setUserInfo(data) {
//   this._profileName.textContent = data.name;
//   this._profileDescription.textContent = data.about;
//   this._profileAvatar.src = data.avatar;
// }
///////////////////////////////////////////////////////////////////////////////////
// setUserInfo({name, about, id}) {
//   this._profileName.textContent = name;
//   this._profileDescription.textContent = about;
//   this._id = id;
// }
////////////////////////////////////////////////////////////////////////////////////////

setUserInfo({name, about}) {
  this._profileName.textContent = name;
  this._profileDescription.textContent = about;

}
setAvatar(avatarURL) {
  this._profileAvatar.src = avatarURL;
}

getID() {return this._id}
}
