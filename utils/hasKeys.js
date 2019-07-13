/**
 * ObjectにKeyがあるかどうかチェックする
 * @param {*} obj 対象のオブジェクト
 * @param {*} keys キーの配列
 */
const hasKeys = (obj, keys) => {
  return !keys.find(key => (!obj.hasOwnProperty(key)))
}

export default hasKeys
