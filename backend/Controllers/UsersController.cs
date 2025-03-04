using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class UsersController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
