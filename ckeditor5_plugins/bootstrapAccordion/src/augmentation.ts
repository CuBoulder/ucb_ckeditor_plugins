import type { ClipboardPipeline } from '@ckeditor/ckeditor5-clipboard';
import type { DataFilter } from '@ckeditor/ckeditor5-html-support';
import type { BootstrapAccordionConfig, ItemsStayOpen, ItemsStayOpenAttributeDefinition } from './bootstrapaccordionconfig';
import type BootstrapAccordionCollapseAllCommand from './commands/bootstrapaccordioncollapseallcommand';
import type BootstrapAccordionEvents from './bootstrapaccordionevents';
import type BootstrapAccordionFirstItemOpenCommand from './commands/bootstrapaccordionfirstitemopencommand';
import type BootstrapAccordionOpenAllCommand from './commands/bootstrapaccordionopenallcommand';
import type InsertBootstrapAccordionCommand from './commands/insertbootstrapaccordioncommand';
import type InsertBootstrapAccordionItemCommand from './commands/insertbootstrapaccordionitemcommand';
import type ModifyBootstrapAccordionCommand from './commands/modifybootstrapaccordioncommand';
import type RemoveBootstrapAccordionItemCommand from './commands/removebootstrapaccordionitemcommand';

declare module '@ckeditor/ckeditor5-core' {
  interface EditorConfig {
    bootstrapAccordion: BootstrapAccordionConfig;
  }
  interface CommandsMap {
    bootstrapAccordionCollapseAll: BootstrapAccordionCollapseAllCommand;
    bootstrapAccordionFirstItemOpen: BootstrapAccordionFirstItemOpenCommand;
    bootstrapAccordionItemsStayOpen: ModifyBootstrapAccordionCommand<ItemsStayOpen, ItemsStayOpenAttributeDefinition>;
    bootstrapAccordionOpenAll: BootstrapAccordionOpenAllCommand;
    insertBootstrapAccordion: InsertBootstrapAccordionCommand;
    insertBootstrapAccordionItem: InsertBootstrapAccordionItemCommand;
    removeBootstrapAccordionItem: RemoveBootstrapAccordionItemCommand;
  }
  interface PluginsMap {
    [BootstrapAccordionEvents.pluginName]: BootstrapAccordionEvents;
    [ClipboardPipeline.pluginName]: ClipboardPipeline;
    [DataFilter.pluginName]: DataFilter;
  }
}
