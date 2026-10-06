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

            <h3 className="sources-subtitle">Книги и публикации</h3>
            <ul className="sources-list">
                <li>
                    <strong>Левин, Я. А.</strong> 100 деталей Ярославля : исторические очерки об элементах архитектурной среды. — Ярославль : Александр Рутман, 2009. — 212 с.
                </li>
                <li>
                    <strong>Маров, В. Ф.</strong> Ярославль. Архитектура и градостроительство. — Ярославль : Академия 76, 2019. — 286 с.
                </li>
                <li>
                    <strong>Марасанова, В. М.</strong> Летопись Ярославля : 1010–2010. — СПб. : Морской Петербург, 2007. — 359 с.
                </li>
                <li>
                    <strong>Рутман, А. М.</strong> (сост.) История губернского города Ярославля : сборник. — Ярославль : Изд-во Александра Рутмана, 2006. — 516 с.
                </li>
                <li>
                    <strong>Ваганова, И. В. и др.</strong> (сост.) Ярославль : История города в документах и материалах от первых упоминаний до 1917 г. — Ярославль : Верх.-Волж. кн. изд-во, 1990. — 430 с.
                </li>
                <li>
                    <strong>Юрчук, К. И.</strong> Промышленное предпринимательство ярославских дворян в конце XVIII – первой половине XIX в. — Ярославль : ЯрГУ, 2005. — 159 с.
                </li>
            </ul>

            <h3 className="sources-subtitle">Официальные ресурсы и проекты</h3>
            <ul className="sources-list">
                <li>
                    <a href="https://medved-yaroslavl.ru/" target="_blank" rel="noreferrer">
                        Официальный сайт проекта «Ярославские Медведики»
                    </a> — информация о скульптурах, их расположении и истории.
                </li>
                <li>
                    <a href="https://visityaroslavia.ru/" target="_blank" rel="noreferrer">
                        Туристический портал Ярославской области
                    </a> — официальные маршруты и описания достопримечательностей.
                </li>
                <li>
                    <a href="https://yandex.ru/maps/" target="_blank" rel="noreferrer">
                        Яндекс Карты
                    </a> — координаты и панорамы объектов.
                </li>
                <li>
                    <a href="https://yarkremlin.ru/" target="_blank" rel="noreferrer">
                        Ярославский музей-заповедник
                    </a> — исторические материалы о городе.
                </li>
            </ul>

            <h3 className="sources-subtitle">Периодические издания и краеведческие материалы</h3>
            <ul className="sources-list">
                <li>
                    <a href="https://vesti-yaroslavl.ru/" target="_blank" rel="noreferrer">
                        Вести Ярославль
                    </a> — региональные новости и публикации о культурной жизни.
                </li>
                <li>
                    <a href="https://clib.yar.ru/" target="_blank" rel="noreferrer">
                        Централизованная библиотечная система города Ярославля
                    </a> — краеведческие списки литературы и виртуальные экскурсии.
                </li>
            </ul>
        </>
    );
}