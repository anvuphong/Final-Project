namespace OAM_Backend.Models
{
    public class PageAction
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SortType { get; set; } = "";
        public string SortBy { get; set; } = "";
        public string SearchBy { get; set; } = "";
        public string SearchValue { get; set; } = "";

        public PageAction()
        {
            this.PageNumber = 1;
            this.PageSize = 10;
            this.SortBy = "";
            this.SortType = "";
            this.SearchBy = "";
            this.SearchValue = "";
        }
        public PageAction(int pageNumber, int pageSize, string sortBy, string sortType, string searchBy, string searchValue)
        {
            this.PageNumber = pageNumber < 1 ? 1 : pageNumber;
            this.PageSize = pageSize < 1 ? 1 : pageSize;
            this.SortBy = sortBy;
            this.SortType = sortType;
            this.SearchBy = searchBy;
            this.SearchValue = searchValue;
        }
    }
}
