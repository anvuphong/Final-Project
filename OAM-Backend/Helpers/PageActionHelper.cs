using OAM_Backend.Models;
using OAM_Backend.Models.Responses;
using OAM_Backend.Services;

namespace OAM_Backend.Helpers
{
    public class PageActionHelper
    {
        public static PagedResponse<List<T>> CreatePagedReponse<T>(
            List<T> pagedData,
            PageAction validFilter,
            int totalRecords
        )
        {
            var respose = new PagedResponse<List<T>>(
                pagedData, 
                validFilter.PageNumber, 
                validFilter.PageSize,
                validFilter.SortBy,
                validFilter.SortType,
                validFilter.SearchBy,
                validFilter.SearchValue
            );
            var totalPages = ((double)totalRecords / (double)validFilter.PageSize);
            int roundedTotalPages = Convert.ToInt32(Math.Ceiling(totalPages));
            respose.NextPage =
                validFilter.PageNumber >= 1 && validFilter.PageNumber < roundedTotalPages
                ? validFilter.PageNumber + 1
                : validFilter.PageNumber;
            respose.PreviousPage =
                validFilter.PageNumber - 1 >= 1 && validFilter.PageNumber <= roundedTotalPages
                ? validFilter.PageNumber - 1
                : validFilter.PageNumber;
            respose.FirstPage = 1;
            respose.LastPage = roundedTotalPages;
            respose.TotalPages = roundedTotalPages;
            respose.TotalRecords = totalRecords;
            return respose;
        }
    }
}
