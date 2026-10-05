import './SourcesSection.css'
import { SectionTitle } from '../SectionTitle';

export function SourcesSection() {
    return (
        <>
            <SectionTitle
                id="sources"
                title={"Источники"}
                level={2}
                text={"Материалы, использованные при создании путеводителя"}
                />

            <ul className="sources-list">
                <li>
                    <a
                    href="https://medved-yaroslavl.ru/"
                    target="_blank"
                    rel="noreferrer"
                    >
                    Официальный сайт проекта «Ярославские Медведики»
                    </a>
                </li>

                <li>
                    <a
                    href="https://vesti-yaroslavl.ru/"
                    target="_blank"
                    rel="noreferrer"
                    >
                    Вести Ярославль
                    </a>
                </li>

                <li>
                    <a
                    href="https://yandex.ru/maps/"
                    target="_blank"
                    rel="noreferrer"
                    >
                    Яндекс Карты
                    </a>
                </li>
            </ul>
        </>
    );
}