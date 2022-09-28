import {
  Component,
  ElementRef, EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {SelectOption} from "../../models/select-option.model";
import {FormControl} from "@angular/forms";

type MultipleSelectProps = {
  multiple: true
  value: SelectOption[]
  onChange: (value: SelectOption[]) => void
}

type SingleSelectProps = {
  multiple?: false
  value?: SelectOption
  onChange: (value: SelectOption | undefined) => void
}

export type SelectProps = {
  options: SelectOption[]
} & (SingleSelectProps | MultipleSelectProps)

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss']
})
export class SelectBoxComponent implements OnInit {
  
  value: SelectProps['value'] | undefined
  
  isOpen: boolean = false;
  highlightedIndex: number | boolean = false;
  
  @Input() options: SelectProps['options'] = [];
  filteredOptions: SelectProps['options'] = [];
  @Input() multiple: SelectProps["multiple"] = false;
  @Input() placeholderText: string = 'Select options';
  @Input() maxCount: number = Infinity;
  @Input() enableSearch: boolean = false;
  
  searchCtrl: FormControl
  
  @Output() valueChanged: EventEmitter<SelectProps['value']> = new EventEmitter<SelectProps['value']>()
  /**
   * Card info element
   * @type {ElementRef}
   */
  @ViewChild('selectRef') selectRef!: ElementRef;

  constructor() {
    this.searchCtrl = new FormControl('')
  }

  ngOnInit(): void {
    this.filteredOptions = this.options
  }
  
  clearOptions(e: Event): void {
    e.stopPropagation();
    this.onChange(undefined)
    this.isOpen = false;
  }
  
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.selectRef) {
      if (!this.selectRef.nativeElement.contains(event.target)) {
        this.isOpen = false
      }
    }
  }
  
  onChange(value: SelectProps['value']): void {
    this.value = value
    this.valueChanged.emit(value)
  }
  
  
  setIsOpen(isOpen: boolean): void {
    this.isOpen = isOpen
  }
  
  selectOption(option: SelectOption, e: Event): void{
    e.stopPropagation()
    this.isOpen = false
    this.resetSearch()
    if (option.disabled) {
      return
    }
    if (this.multiple) {
      this.selectMultipleOption(option)
      return
    }
    if (option !== this.value) {
      this.onChange(option)
    }
  }
  
  selectMultipleOption(option: SelectOption): void {
    const val = this.value ? (this.value as SelectOption[]) : []
    if (val.includes(option)) {
      this.onChange(val.filter(o => o !== option))
      return
    }
    if (val.length >= this.maxCount) {
      return
    }
    this.onChange([...val, option])
  }
  
  isOptionSelected(option: SelectOption | SelectOption[]): boolean {
    if (this.value)
     return this.multiple ? (this.value as SelectOption[]).includes(option as SelectOption) : option === this.value
    return false;
  }
  
  setHighlightedIndex(index: number): void {
    this.highlightedIndex = index
  }
  
  get arrayedValue(): SelectOption[] {
    return (this.value as SelectOption[])
  }
  
  get singleValue(): SelectOption {
    return (this.value as SelectOption)
  }
  
  searchItem() {
    this.filteredOptions = this.options.filter(o => o.label.toLowerCase().includes(this.searchCtrl.value.toLowerCase()))
  }
  
  resetSearch() {
    this.searchCtrl.reset()
    this.filteredOptions = this.options
  }

}
