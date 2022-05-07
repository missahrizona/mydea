export class SaveDarkMode {
  static success: Function = function (this: any) {
    return async function (this: any, res: any) {
      if (res.modifiedCount == 1) {
        let toast = await this.toastController.create({
          message: 'Your settings have been saved.',
          duration: 2000,
        });
        toast.present();
      }
    };
  };

  static succeed: Function = function (this: any, res: any) {
    console.log(this);
    console.log(res);
  };
}
