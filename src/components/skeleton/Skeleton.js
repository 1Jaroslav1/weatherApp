import './skeleton.scss';

const Skeleton = () => {
    return (
        <>
            <div className="skeleton">
                <div className="skeleton__block-short"></div>
                <div className="skeleton__block-short"></div>
                <div className="skeleton__block-short"></div>
                <div className="skeleton__block-circle">
                    <div className="skeleton-circle"></div>
                    <div className="skeleton__block-mini"></div>
                </div>
                <div className="skeleton__block-circle">
                    <div className="skeleton-circle"></div>
                    <div className="skeleton__block-mini"></div>
                </div>
                <div className="skeleton__block-circle">
                    <div className="skeleton-circle"></div>
                    <div className="skeleton__block-mini"></div>
                </div>
                <div className="skeleton__block"></div>
                <div className="skeleton__block"></div>
                <div className="skeleton__block"></div>
                <div className="skeleton__block"></div>
            </div>
        </>
    )
}

export default Skeleton;