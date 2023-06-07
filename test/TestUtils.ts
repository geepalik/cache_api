export class TestUtils {
    static async timeOut(milliseconds: number) {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, milliseconds);
        });
      }
}