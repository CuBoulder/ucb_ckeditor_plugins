# CKEditor 5 Plugin: Bootstrap Accordion

## Model
```xml
<bootstrapAccordion
  bootstrapAccordionId="..."
  bootstrapAccordionStyle="regular|flush"
  bootstrapAccordionItemsStayOpen="false|true">
  <bootstrapAccordionItem>
    <bootstrapAccordionHeader>
      <bootstrapAccordionButton
        bootstrapAccordionButtonCollapsed="true|false">...</bootstrapAccordionButton>
    </bootstrapAccordionHeader>
    <bootstrapAccordionCollapse bootstrapAccordionCollapseShow="false|true">
      <bootstrapAccordionBody>
        ...
      </bootstrapAccordionBody>
    </bootstrapAccordionCollapse>
  </bootstrapAccordionItem>
  <bootstrapAccordionItem>
    <bootstrapAccordionHeader>
      <bootstrapAccordionButton
        bootstrapAccordionButtonCollapsed="true|false">...</bootstrapAccordionButton>
    </bootstrapAccordionHeader>
    <bootstrapAccordionCollapse bootstrapAccordionCollapseShow="false|true">
      <bootstrapAccordionBody>
        ...
      </bootstrapAccordionBody>
    </bootstrapAccordionCollapse>
  </bootstrapAccordionItem>
  ...
</bootstrapAccordion>
```

## HTML
```html
<div
  class="accordion accordion-flush? accordion-items-stay-open?"
  data-accordion-id="...">
  <div class="accordion-item">
    <div class="accordion-header">
      <a class="accordion-button collapsed?" href="#">...</a>
    </div>
    <div class="accordion-collapse collapse show?">
      <div class="accordion-body">
        ...
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <div class="accordion-header">
      <a class="accordion-button collapsed?" href="#">...</a>
    </div>
    <div class="accordion-collapse collapse show?">
      <div class="accordion-body">
        ...
      </div>
    </div>
  </div>
  ...
</div>
```
