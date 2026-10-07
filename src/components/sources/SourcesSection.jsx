import './SourcesSection.css'
import { SectionTitle } from '../SectionTitle';

const ACCESS_DATE = "07.10.2026"; // поставьте дату, когда реально открывали сайты

const listStyle = { listStyle: "decimal", paddingLeft: "28px" };

export function SourcesSection() {
    return (
        <>
            <SectionTitle
                id="sources"
                title={"Источники"}
                level={2}
                text={"Материалы, использованные при создании путеводителя"}
            />

            <h3 className="sources-subtitle">Литература</h3>
            <ol className="sources-list" style={listStyle}>
                <li>
                    <strong>История</strong> губернского города Ярославля : сборник / сост. А. М. Рутман. — Ярославль : Изд-во Александра Рутмана, 2006. — 516 с.
                </li>
                <li>
                    <strong>Левин, Я. А.</strong> 100 деталей Ярославля : исторические очерки об элементах архитектурной среды. — Ярославль : Александр Рутман, 2009. — 212 с.
                </li>
                <li>
                    <strong>Марасанова, В. М.</strong> Летопись Ярославля : 1010–2010. — Санкт-Петербург : Морской Петербург, 2007. — 359 с.
                </li>
                <li>
                    <strong>Маров, В. Ф.</strong> Ярославль. Архитектура и градостроительство. — Ярославль : Академия 76, 2019. — 286 с.
                </li>
                <li>
                    <strong>Юрчук, К. И.</strong> Промышленное предпринимательство ярославских дворян в конце XVIII – первой половине XIX в. — Ярославль : ЯрГУ, 2005. — 159 с.
                </li>
                <li>
                    <strong>Ярославль</strong> : история города в документах и материалах от первых упоминаний до 1917 г. / сост. И. В. Ваганова [и др.]. — Ярославль : Верх.-Волж. кн. изд-во, 1990. — 430 с.
                </li>
            </ol>

            <h3 className="sources-subtitle">Электронные ресурсы</h3>
            <ol className="sources-list" style={{ ...listStyle }} start={7}>
                <li>
                    Вести Ярославль : [сайт]. — URL:{" "}
                    <a href="https://vesti-yaroslavl.ru/" target="_blank" rel="noreferrer">https://vesti-yaroslavl.ru/</a>{" "}
                    (дата обращения: {ACCESS_DATE}). — Текст : электронный.
                </li>
                <li>
                    Туристический портал Ярославской области : [сайт]. — URL:{" "}
                    <a href="https://visityaroslavia.ru/" target="_blank" rel="noreferrer">https://visityaroslavia.ru/</a>{" "}
                    (дата обращения: {ACCESS_DATE}). — Текст : электронный.
                </li>
                <li>
                    Централизованная библиотечная система города Ярославля : [сайт]. — URL:{" "}
                    <a href="https://clib.yar.ru/" target="_blank" rel="noreferrer">https://clib.yar.ru/</a>{" "}
                    (дата обращения: {ACCESS_DATE}). — Текст : электронный.
                </li>
                <li>
                    Яндекс Карты : [сервис]. — URL:{" "}
                    <a href="https://yandex.ru/maps/" target="_blank" rel="noreferrer">https://yandex.ru/maps/</a>{" "}
                    (дата обращения: {ACCESS_DATE}). — Текст : электронный.
                </li>
                <li>
                    Ярославские Медведики : официальный сайт проекта. — URL:{" "}
                    <a href="https://medved-yaroslavl.ru/" target="_blank" rel="noreferrer">https://medved-yaroslavl.ru/</a>{" "}
                    (дата обращения: {ACCESS_DATE}). — Текст : электронный.
                </li>
                <li>
                    Ярославский музей-заповедник : [сайт]. — URL:{" "}
                    <a href="https://yarkremlin.ru/" target="_blank" rel="noreferrer">https://yarkremlin.ru/</a>{" "}
                    (дата обращения: {ACCESS_DATE}). — Текст : электронный.
                </li>
            </ol>
        </>
    );
}