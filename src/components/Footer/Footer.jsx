import './Footer.css'
import { Link } from "react-router-dom";

function Footer() {

  return (
    <div className="footer">
            <div className="container">
                <div className="footer__content">
                    <ul className="footer__left-list">
                        <li className="footer__list-item"><Link className="footer__link" to='/aboutproject'>О проекте</Link></li>
                        <li className="footer__list-item"><Link className="footer__link" to='/cooperation'>Сотрудничество</Link></li>
                        <li className="footer__list-item"><Link className="footer__link" to='/contacts'>Контакты</Link></li>
                    </ul>
                    <ul className="footer__right-list">
                        <li className="footer__list-item">Санкт-Петербург</li>
                        <li className="footer__list-item">ул. Профессора Попова, д. 32/4</li>
                        <li className="footer__list-item">+7-(880)-555-35-55</li>
                    </ul>
                </div>
            </div>
        </div>
  )
}

export default Footer