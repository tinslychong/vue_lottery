
	import jsonp from '@/common/js/jsonp'
	import {commonParams, options} from '@/api/config'
	/** UA */

	var  USER_AGENT = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36";

	/**
	 * uidתcontianerId
	 * 
	 * @author yanximin
	 */
	export  function uidToContainerId(uid) {
		if (uid == null)
			throw new IllegalArgumentException("uid is null");
		return 107603 + uid;
	}

	
	/**
	 * 昵称转ContainerId
	 * 
	 * @author yanximin
	 * @throws IOException
	 * @throws ClientProtocolException
	 */
	export function nicknameToContainerId(nickname,callback){
		var  url = "http://m.weibo.com/n/" + nickname;

		const Http=new XMLHttpRequest();
		Http.open("GET",url);
		Http.send();
		Http.onreadystatechange=function(){
			if(this.readyState == 4 && this.status == 302)
			{
				var headers = Http.getAllResponseHeaders().toLocaleLowerCase();
				console.log(headers)

			}
		}
		// }	
		// HttpClient httpClient = HttpClients.createDefault();
		// HttpPost post = new HttpPost(url);
		// post.setHeader("User-Agent", USER_AGENT);
		// HttpResponse response = httpClient.execute(post);
		// post.abort();
		// if (response.getStatusLine().getStatusCode() == 302) {
		// 	String cid = response.getLastHeader("Location").getValue().substring(27);
		// 	return "107603" + cid;
		// }
		// return null;
	}

	// /**
	//  * 用户名转contianerId
	//  * 
	//  * @author yanximin
	//  * @throws IOException
	//  * @throws ClientProtocolException
	//  */
	// static String usernameToContainerId(String name) throws ClientProtocolException, IOException {
	// 	String url = "https://weibo.cn/" + name;
	// 	HttpClient httpClient = HttpClients.createDefault();
	// 	HttpGet get = new HttpGet(url);
	// 	get.setHeader("User-Agent", USER_AGENT);
	// 	HttpResponse response = httpClient.execute(get);
	// 	String ret = EntityUtils.toString(response.getEntity(), "utf-8");
	// 	Pattern pattern = Pattern.compile("href=\"/([\\d]*?)/info\"");
	// 	Matcher matcher = pattern.matcher(ret);
	// 	while (matcher.find()) {
	// 		return "107603" + matcher.group(1);
	// 	}
	// 	return null;
	// }

	// public static List<String> getAllImgURL(String containerid) throws Exception {
	// 	List<String> urls = new ArrayList<String>();
	// 	int i = 1;
	// 	while (getImgURL(containerid, i, urls) > 0) {
	// 		System.out.println("分析微博中: " + i);
	// 		i++;
	// 		// 防封，分析一次页面休息+1S
	// 		Thread.sleep(1000);
	// 	}
	// 	return urls;
	// }

	// private static int getImgURL(String containerid, int page, List<String> urls) throws ParseException, IOException {
	// 	String url = "https://m.weibo.cn/api/container/getIndex?count=25&page=" + page + "&containerid=" + containerid;
	// 	HttpClient httpClient = getHttpClient();
	// 	HttpGet get = new HttpGet(url);
	// 	get.setHeader("User-Agent", USER_AGENT);
	// 	HttpResponse response = httpClient.execute(get);
	// 	String ret = EntityUtils.toString(response.getEntity(), "utf-8");
	// 	JsonObject root = new JsonParser().parse(ret).getAsJsonObject();
	// 	JsonObject asJsonObject = root.getAsJsonObject("data");
	// 	JsonArray array = asJsonObject.getAsJsonArray("cards");
	// 	for (int i = 0; i < array.size(); i++) {
	// 		JsonObject mblog = array.get(i).getAsJsonObject().getAsJsonObject("mblog");
	// 		if (mblog != null) {
	// 			JsonArray pics = mblog.getAsJsonArray("pics");
	// 			if (pics != null) {
	// 				for (int j = 0; j < pics.size(); j++) {
	// 					JsonObject o = pics.get(j).getAsJsonObject();
	// 					JsonObject large = o.getAsJsonObject("large");
	// 					if (large != null) {
	// 						urls.add(large.get("url").getAsString());
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// 	return array.size();
	// }


