import './Header.css'
import { Link } from "react-router-dom";

function Header() {

  return (
    <div className="header">
      <div className="container">
        <div className="header__content">
          <ul className="header__list">
            <li className="header__list-item">
              <div className="logo">
                <div className="logo--pc">
                  <Link className="header__list-link" to='/'>
                  <svg width="70" height="70" viewBox="0 -2 24 20" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff" strokeWidth="0.00016"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M14.5 1h-13l-.5.5v13l.5.5h13l.5-.5v-13l-.5-.5zM14 14H5v-2h2.3c.3.6 1 1 1.7 1 1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2H4v3H2V2h2v2.3c-.6.3-1 1-1 1.7 0 1.1.9 2 2 2s2-.9 2-2h2c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2c-.7 0-1.4.4-1.7 1H6.7c-.3-.6-1-1-1.7-1V2h9v12zm-6-3c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1-1-.4-1-1zM5 5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm6 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"></path></g></svg>
                  </Link>
                </div>
              </div>
            </li>
            <li className="header__list-item"><Link className="header__list-link" to='/schemes'>Схемы</Link></li>
            <li className="header__list-item"><Link className="header__list-link" to='/aboutproject'>О проекте</Link></li>
            <li className="header__list-item"><Link className="header__list-link" to='/cooperation'>Сотрудничество</Link></li>
            <li className="header__list-item"><Link className="header__list-link" to='/contacts'>Контакты</Link></li>
            <li className="header__list-item"><Link className="header__list-link" to='/login'>Войти</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header