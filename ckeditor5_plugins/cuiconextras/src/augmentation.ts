import type { BackgroundStyle, BackgroundStyleAttributeDefinition, Color, ColorAttributeDefinition, IconConfig } from './cuiconextrasconfig';
import type ModifyIconCommand from './modifyiconcommand';

declare module '@ckeditor/ckeditor5-core' {
  interface EditorConfig {
    icon?: IconConfig;
  }
  interface CommandsMap {
    changeIconCUColor: ModifyIconCommand<Color, ColorAttributeDefinition>;
    changeIconCUBackgroundStyle: ModifyIconCommand<BackgroundStyle, BackgroundStyleAttributeDefinition>;
  }
}
