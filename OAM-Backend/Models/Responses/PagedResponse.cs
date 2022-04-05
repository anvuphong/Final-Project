namespace OAM_Backend.Models.Responses
{
    public class PagedResponse<T> : Response<T>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int FirstPage { get; set; }
        public int LastPage { get; set; }
        public int TotalPages { get; set; }
        public int TotalRecords { get; set; }
        public int NextPage { get; set; }
        public int PreviousPage { get; set; }
        public string? SortType { get; set; }
        public string? SortBy { get; set; }
        public string? SearchBy { get; set; }
        public string? SearchValue { get; set; }

        public PagedResponse()
        {
        }

        public PagedResponse(
            T data, 
            int pageNumber, 
            int pageSize, 
            string sortBy, 
            string sortType, 
            string searchBy, 
            string searchValue
        )
        {
            this.PageNumber = pageNumber;
            this.PageSize = pageSize;
            this.Data = data;
            this.SortBy = sortBy;
            this.SortType = sortType;
            this.SearchBy = searchBy;
            this.SearchValue = searchValue;
            this.Message = null;
            this.Succeeded = true;
            this.Errors = null;
        }
    }
}
