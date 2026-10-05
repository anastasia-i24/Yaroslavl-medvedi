import './SectionTitle.css'
import BearPaw from '/paw-print.png'

export function SectionTitle({ title, level, text, id }) {
    const Tag = `h${level}`;
    return (
        <div>
            <Tag id={id} className='section-title'>
                <img src={BearPaw} className='section-title-icon'/>
                {title}
            </Tag>
            <p>
                {text}
            </p>
        </div>
    );
}