import QRCode from 'qrcode'
import { promisify } from 'es6-promisify'

const genDataUrl: (payload: string) => Promise<string> = promisify(QRCode.toDataURL.bind(QRCode))

// NOTE: Несколько других устройств для аутентификации по QR коду:
// TODO: Could be moved to envs
const authOnOtherDevicesLimit = 2

/**
 * Класс Одиночка предоставляет метод getInstance, который позволяет клиентам
 * получить доступ к уникальному экземпляру одиночки.
 */
class Singleton {
  private static instance: Singleton;
   state: Map<string, { qr: string, hash: string, additionalLoggedCounter: number, infoUrl: string, success_url: string, fail_url: string }>;

  /**
   * Конструктор Одиночки всегда должен быть скрытым, чтобы предотвратить
   * создание объекта через оператор new.
   */
  private constructor() {
    this.state = new Map()
  }

  /**
   * Статический метод, управляющий доступом к экземпляру одиночки.
   *
   * Эта реализация позволяет вам расширять класс Одиночки, сохраняя повсюду
   * только один экземпляр каждого подкласса.
   */
  public static getInstance(): Singleton {
      if (!Singleton.instance) {
          Singleton.instance = new Singleton();
      }

      return Singleton.instance;
  }

  /**
   * Наконец, любой одиночка должен содержать некоторую бизнес-логику, которая
   * может быть выполнена на его экземпляре.
   */
  public async createQR(payload: string) {
    const dataUrl = await genDataUrl(payload)

    return dataUrl
  }
  public async addExistsSession({
    reqId,
    infoUrl: payload,
    infoUrl,
    hash,
    success_url,
    fail_url,
  }: { reqId: string, payload: string, hash: string, infoUrl: string, success_url: string, fail_url: string }): Promise<string> {
    const qr = await this.createQR(payload)

    this.state.set(reqId, {
      hash,
      qr,
      additionalLoggedCounter: 0, // Login on first device.
      success_url,
      fail_url,
      infoUrl,
    })

    return qr
  }
  public addLoggedSessionOrDelete(reqId: string): Promise<string> {
    if (this.state.has(reqId)) {
      const sesData = this.state.get(reqId)
      
      if (sesData.additionalLoggedCounter < authOnOtherDevicesLimit) {
        const newLoggedCounter = sesData.additionalLoggedCounter + 1

        this.state.set(reqId, {
          ...sesData,
          additionalLoggedCounter: newLoggedCounter,
        })
        return Promise.resolve(`Вы аутентифицированы ${newLoggedCounter} раз`)
      } else {
        this.state.delete(reqId)
        return Promise.resolve('Вы аутентифицированы последний раз на доп устройстве в рамках конкретной сессии')
      }
    } else {
      return Promise.reject('Извините, такой сессии нет в памяти. Попробуйте авторизоваться еще раз.')
    }
  }
}

export const addsDevicesLoggedState = Singleton.getInstance()
