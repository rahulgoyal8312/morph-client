import React, { Component } from "react";
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import styles from './UploadBox.module.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


// Our app
class UploadBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }
    
    handleInit() {
        console.log('FilePond instance has initialised', this.pond);
    }

    render() {
        console.log(this.state.files)
        return (
            <div className={styles.uploadbox}>
            
                {/* Pass FilePond properties as attributes */}
                <FilePond ref={ref => this.pond = ref}
                          files={this.state.files}
                          allowMultiple={true}
                          maxFiles={2}
                          name={'singleimage'}
                          allowReorder={true}
                          instantUpload={false}
                          labelIdle={'Drag & Drop your Images or <span class="filepond--label-action"> Browse </span>'}
                          server={'/api/upload'}
                          oninit={() => this.handleInit() }
                          onupdatefiles={(fileItems) => {
                              this.setState({
                                  files: fileItems.map(fileItem => fileItem.file)
                              });
                          }}
                          onprocessfile={(error, fileItem) => {
                              if(!error){
                              this.props.handleFileName(fileItem.file.name)
                            } else{
                                console.error(error)
                            } 
                        }}

                          >
                </FilePond>

            </div>
        );
    }
}

export default UploadBox;