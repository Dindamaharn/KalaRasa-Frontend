import ArrowIcon from "../../assets/icons/back.svg";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPages = () => {
        const pages = [];

        if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
        if (currentPage <= 3) {
            pages.push(1, 2, 3, 4, "...", totalPages);
        } else if (currentPage >= totalPages - 2) {
            pages.push(
            1,
            "...",
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages
            );
        } else {
            pages.push(
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages
            );
        }
        }

        return pages;
    };

    const pages = getPages();

    return (
        <div className="pagination">

        <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
        >
            <img src={ArrowIcon} className="icon" alt="prev" />
        </button>

        {pages.map((page, index) =>
            page === "..." ? (
            <span key={index} className="ellipsis">...</span>
            ) : (
            <button
                key={index}
                className={`page-number ${page === currentPage ? "active" : ""}`}
                onClick={() => onPageChange(page)}
            >
                {page}
            </button>
            )
        )}


        <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
        >
            <img
            src={ArrowIcon}
            className="icon rotate"
            alt="next"
            />
        </button>

        </div>
    );
};

export default Pagination;