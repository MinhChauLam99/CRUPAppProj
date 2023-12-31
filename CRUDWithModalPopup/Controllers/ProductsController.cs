﻿using CRUDWithModalPopup.Controllers.DAL;
using CRUDWithModalPopup.Models.DBEntities;
using Microsoft.AspNetCore.Mvc;

namespace CRUDWithModalPopup.Controllers
{
    public class ProductsController : Controller
    {
        private readonly MyAppDbContext _context;

        public ProductsController(MyAppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetProducts()
        {
            var products = _context.Products.ToList();
            return Json(products);
        }

        [HttpPost]
        public JsonResult Insert(Products Product)
        {
            if (ModelState.IsValid)
            {
                _context.Products.Add(Product);
                _context.SaveChanges();
                return Json("Product details saved.");
            }
            return Json("Model validation failed.");
        }

        [HttpGet]
        public JsonResult Edit(int id)
        {
            var product = _context.Products.Find(id);
            return Json(product);
        }

        [HttpPost]
        public JsonResult Update(Products model)
        {
            if(ModelState.IsValid)
            {
                _context.Products.Update(model);
                _context.SaveChanges();
                return Json("Product detailes updated.");
            }
            return Json("Model validation failed.");
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            var product = _context.Products.Find(id);
            if(product != null)
            {
                _context.Products.Remove(product);
                _context.SaveChanges();
                return Json("Product detaltails delete.");
            }
            return Json("Product details not found with id {id}");
        }
    }
}
