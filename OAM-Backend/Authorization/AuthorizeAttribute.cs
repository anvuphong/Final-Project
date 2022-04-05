using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using OAM_Backend.Models;

namespace OAM_Backend.Authorization
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        /**
         * Authorization is performed by the OnAuthorization method which checks if there is 
         * an authenticated user attached to the current request (context.HttpContext.Items["User"]). 
         * An authenticated user is attached by the custom jwt middleware if the request contains 
         * a valid JWT access token.
         * 
         * On successful authorization no action is taken and the request is passed through to 
         * the controller action method, if authorization fails a 401 Unauthorized response is returned.
         */
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            // skip authorization if action is decorated with [AllowAnonymous] attribute
            var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();
            if (allowAnonymous)
                return;

            // authorization
            var user = (User)context.HttpContext.Items["User"];
            if (user == null)
            {
                context.Result = new JsonResult(new { message = "Unauthorized" })
                {
                    StatusCode = StatusCodes.Status401Unauthorized
                };
            }

        }
    }
}
