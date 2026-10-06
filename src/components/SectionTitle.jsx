import './SectionTitle.css'

export function SectionTitle({ title, level, text, id }) {
    const Tag = `h${level}`;
    return (
        <>
            <Tag id={id} className='section-title'>
                {title}
            </Tag>
            <p className='section-title-text'>
                {text}
            </p>
        </>
    );
}