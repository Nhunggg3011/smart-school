import React from 'react'
import ErrorBgImage from 'assets/img/404.svg'

export default () => (
  <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
    <h2>Ooops, Trang không tồn tại :( </h2>
    <img src={ErrorBgImage} width={500} height={500} alt="500" />
    <br />
    <button
      type="button"
      onClick={() => window.location.assign(window.location.origin)}
    >
      Refresh
    </button>
  </div>
)
