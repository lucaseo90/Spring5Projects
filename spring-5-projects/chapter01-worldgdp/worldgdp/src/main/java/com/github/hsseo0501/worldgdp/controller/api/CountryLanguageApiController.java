package com.github.hsseo0501.worldgdp.controller.api;

import com.github.hsseo0501.worldgdp.dao.CountryLanguageDao;
import com.github.hsseo0501.worldgdp.model.CountryLanguage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/languages")
public class CountryLanguageApiController {

  private final CountryLanguageDao countryLanguageDao;

  @Autowired
  public CountryLanguageApiController(CountryLanguageDao countryLanguageDao) {
    this.countryLanguageDao = countryLanguageDao;
  }

  @GetMapping("/{countryCode}")
  public ResponseEntity<?> getLanguages(@PathVariable String countryCode,
      @RequestParam(name = "pageNo", defaultValue = "1") Integer pageNo) {
    try {
      List<CountryLanguage> countryLanguages = countryLanguageDao.getLanguages(countryCode, pageNo);
      return ResponseEntity.ok(countryLanguages);
    } catch (Exception ex) {
      System.out.println("Error while getting languages for country: {}" + countryCode + ex);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while languages cities");
    }
  }

  @PostMapping("/{countryCode}")
  public ResponseEntity<?> addLanguage(@PathVariable String countryCode, @Valid @RequestBody CountryLanguage language) {
    try {
      if (countryLanguageDao.languageExists(countryCode, language.getLanguage())) {
        return ResponseEntity.badRequest().body("Language already exists for country");
      }
      countryLanguageDao.addLanguage(countryCode, language);
      return ResponseEntity.ok(language);
    } catch (Exception ex) {
      System.out.println("Error while adding language: {} to country: {}" + language + countryCode + ex);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while adding language");
    }
  }

  @DeleteMapping("/{countryCode}/language/{language}")
  public ResponseEntity<?> deleteLanguage(@PathVariable String countryCode, @PathVariable String language) {
    try {
      countryLanguageDao.deleteLanguage(countryCode, language);
      return ResponseEntity.ok().build();
    } catch (Exception ex) {
      System.out.println("Error occurred while deleting language : {}, for country: {}" + language + countryCode + ex);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while deleting the language");
    }
  }
}