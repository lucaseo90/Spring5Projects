package com.github.hsseo0501.worldgdp.controller.view;

import com.github.hsseo0501.worldgdp.dao.CityDao;
import com.github.hsseo0501.worldgdp.dao.CountryDao;
import com.github.hsseo0501.worldgdp.dao.LookupDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
@RequestMapping("/")
public class ViewController {

  private final CityDao cityDao;

  private final CountryDao countryDao;

  private final LookupDao lookupDao;

  @Autowired
  public ViewController(CityDao cityDao, CountryDao countryDao, LookupDao lookupDao) {
    this.cityDao = cityDao;
    this.countryDao = countryDao;
    this.lookupDao = lookupDao;
  }

  @GetMapping({"/countries", "/"})
  public String countries(Model model, @RequestParam Map<String, Object> params) {
    model.addAttribute("continents", lookupDao.getContinents());
    model.addAttribute("regions", lookupDao.getRegions());
    model.addAttribute("countries", countryDao.getCountries(params));
    model.addAttribute("count", countryDao.getCountriesCount(params));

    return "countries";
  }

  @GetMapping("/countries/{code}")
  public String countryDetail(@PathVariable String code, Model model) {
    model.addAttribute("c", countryDao.getCountryDetail(code));
    return "country";
  }

  @GetMapping("/countries/{code}/form")
  public String editCountry(@PathVariable String code, Model model) {
    model.addAttribute("c", countryDao.getCountryDetail(code));
    model.addAttribute("cities", cityDao.getCities(code));
    model.addAttribute("continents", lookupDao.getContinents());
    model.addAttribute("regions", lookupDao.getRegions());
    model.addAttribute("heads", lookupDao.getHeadOfStates());
    model.addAttribute("govs", lookupDao.getGovernmentTypes());
    return "country-form";
  }
}
