import { useState } from 'react';
import './NavBar.css';

export function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="navbar">
            <div className="navbar-top">
                <a href="/" className="navbar-title">
                    Медведи Ярославля
                </a>

                <button
                    className="menu-button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Открыть меню"
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>

            {isOpen && (
                <nav className="navbar-menu">
                    <a href="#routes">Маршруты</a>
                    <a href="#bears">Медведи</a>
                    <a href="#sources">Источники</a>
                </nav>
            )}
        </header>
    );
}