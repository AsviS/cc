export class SpyPane {

	activate(data) {
		if ( !data ) { return false; }
		this.app = data.app;
		}
		
	 ClosePanel() {
		this.app.CloseSideBar();
		this.app.CloseMainPanel();
		}
		
	}
