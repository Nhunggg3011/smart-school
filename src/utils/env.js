export const envValues = (prod, dev, local) => {
  switch (process.env.REACT_APP_ENV) {
    case 'prod': return prod
    case 'dev': return dev
    case 'local':
    default:
      return local || dev
  }
}
